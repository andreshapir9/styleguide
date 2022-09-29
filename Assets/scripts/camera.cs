using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class camera : MonoBehaviour
{
    // we are going to try and find the cameras
    WebCamDevice[] devices;
    
    //identifier for the camera's availability
    private bool isCameraAvailable, isBackupAvailable, isBackupRunning;

    //the camera we are using
    private WebCamTexture mainCamera;

    //list of backup cameras
    private List<WebCamTexture> backupCameras = new List<WebCamTexture>(2);

    //defualt backround 
    private Texture defaultBackground;

    //image we are going to display
    [SerializeField]
    private RawImage background;

    //aspect ratio
    [SerializeField]
    private AspectRatioFitter fit;

    //text to display RGB values
    [SerializeField]
    private TMP_Text cameraText;

    // color of the center pixel
    [SerializeField]
    private Color color;
    
    // image at the center to represent the color being detected
    [SerializeField]
    private RawImage colorImage;

    [SerializeField]
    private TextAsset csvFile;

    //we define a dictionary to store data from the csv file
    private Dictionary<int, string[]> colorDict;

    //button used to switch between cameras
    [SerializeField] 
    private Button switchCameraButton;
    
    private void Awake()
    {
        //we get all the cameras and ask for permission
        devices = WebCamTexture.devices;
    }

    private void Start()
    {
        //initialize the default background
        defaultBackground = background.texture;

        //we have to check if there is a camera
        if (devices.Length == 0)//no 
        {
            Debug.Log("No camera detected");
            isCameraAvailable = false;
            return;
        }
        Debug.Log("___________________HERE ARE ALL THE CAMERAS____________________");
        //display all the cameras
        for (int i = 0; i < devices.Length; i++)
        {
            Debug.Log(devices[i].name);
        }

        //we want to find Front Camera and Back Camera but we dont know if they will be available
        for (int i = 0; i < devices.Length; i++)
        {
            //!this is only for mac
            if (devices[i].name == "FaceTime HD Camera (Built-in)")
            {
                //we create a new camera
                mainCamera = new WebCamTexture(devices[i].name, Screen.width, Screen.height);
            }
            //! for iphone we want front camera
            else if (devices[i].name == "Front Camera")
            {
                //we create a new camera
                mainCamera = new WebCamTexture(devices[i].name, Screen.width, Screen.height);
            }
            //! and back camera
            else if (devices[i].name == "Back Camera")
            {
                //we create a new camera
                backupCameras.Add(new WebCamTexture(devices[i].name, Screen.width, Screen.height));
            }
        }

        //we use the first camera
        mainCamera = new WebCamTexture(devices[0].name, Screen.width, Screen.height);


        //if we have more than one camera we have backup cameras
        if (backupCameras.Count > 1)
        {
            isBackupAvailable = true;

            //we remove the first camera from the list
            backupCameras.RemoveAt(0);
        }

        //we set the back camera as the default camera
        mainCamera.Play();

        //we set the background to the back camera
        background.texture = mainCamera;

        //we set the camera as available
        isCameraAvailable = true;

        //we load our color data
        csvFile = Resources.Load<TextAsset>("colornames.bestof");

        //we initialize the dictionary
        populateDict();

        // //we check if the front camera is available
        // //TODO: make the button invisible if the front camera is not available
        // if (isBackupAvailable && devices.Length > 1)
        // {
        //     //we set the button to active
        //     switchCameraButton.gameObject.SetActive(true);

        // }else
        // {
        //     //we set the button to inactive
        //     switchCameraButton.gameObject.SetActive(false);
        // }

        // //we set the button to listen for a click
        // switchCameraButton.onClick.AddListener(() => switchCamera());

        // //debug the on click listener
        // Debug.Log("button listener: " + switchCameraButton.onClick.GetPersistentEventCount());

        //we will invoke the function to get the color every 0.1 seconds 
        InvokeRepeating("getRGBatPosition", 0.1f, 0.1f);
    }

    private void FixedUpdate()
    {
        //lets only do this if the canvas we are on is enabled
        if(!this.gameObject.GetComponent<Canvas>().enabled)
            return;
        //we check if the camera is available
        if(!isCameraAvailable)
            return;
        
        //!i think this is fixed but we shall come back to it
        //TODO: fix aspect ratio
        //we set the aspect ratio if screen is rotated
        fit.aspectRatio = (float)mainCamera.width / (float)mainCamera.height;

        //we set the orientation of the background
        float scaleY = mainCamera.videoVerticallyMirrored ? -1f : 1f;
        
        //if the camera is front facing we flip the background horizontally
        float scaleX = isBackupRunning ? -1f : 1f;
            

        //we set the scale of the background
        background.rectTransform.localScale = new Vector3(scaleX, scaleY, 1f);

        //we set the orientation of the background
        int orient = -mainCamera.videoRotationAngle;

        //we set the orientation of the background
        background.rectTransform.localEulerAngles = new Vector3(0, 0, orient);
        
    }

    private void getRGBatPosition()
    {
        int height = 10;
        int width = 10;
        int x = (int)mainCamera.width/2;
        int y = (int)mainCamera.height/2;
        //we get a block of pixels from the camera size of the block is determined by the height and width
        Color[] pixels = mainCamera.GetPixels(x, y, width, height);
        for (int i = 0; i < pixels.Length; i++)
        {
            //we add the rgb values of each pixel
            color.r = (color.r + pixels[i].r) / 2;
            color.g = (color.g + pixels[i].g) / 2;
            color.b = (color.b + pixels[i].b) / 2;
        }

        colorImage.color = new Color(color.r, color.g, color.b, .5f);

        //we set the text to display the rgb values
        cameraText.text = "R: " + (int)(color.r *255) + " G: " + (int)(color.g *255) + " B: " + (int)(color.b *255) + "\n" + identifyColor();
    }

    //we take in the name of a csv file and read rgb values to find corresponding color
    private string identifyColor(){

        if (colorDict == null)
        {
            return "No color data";
        }

        int r = (int)(color.r * 255);
        int g = (int)(color.g * 255);
        int b = (int)(color.b * 255);
        
        //we get the closest color
        return getClosestColor(r,g,b);
    }

    private String getClosestColor(int r, int g, int b)
    {
        String closestColor = "";
        int closestDistance = 1000000;
        int distance = 0;
        foreach (KeyValuePair<int, string[]> entry in colorDict)
        {
            distance = (int)Mathf.Sqrt(Mathf.Pow(r - int.Parse(entry.Value[1]), 2) + Mathf.Pow(g - int.Parse(entry.Value[2]), 2) + Mathf.Pow(b - int.Parse(entry.Value[3]), 2));
            if (distance < closestDistance)
            {
                closestDistance = distance;
                closestColor = entry.Value[0];
            }
        }
        return closestColor;
    }

    private void populateDict()
    {
        colorDict = new Dictionary<int, string[]>();

        //we split the csv file into lines
        String[] data = csvFile.text.Split(new char[] { '\n' });

        //we loop through each line
        for (int i = 1; i < data.Length-1; i++)
        {
            //we split each line into columns
            String[] row = data[i].Split(new char[] { ',' });
            
            //Debug.Log(row[0] + " " + row[1]);

            if(row[1].StartsWith("#"))
                row[1] = row[1].Remove(0, 1);
            //we convert the second row from hex to rgb
            int r = Convert.ToInt32(row[1].Substring(0,2),16);
            int g = Convert.ToInt32(row[1].Substring(2,2),16);
            int b = Convert.ToInt32(row[1].Substring(4,2),16);

            //we add the data to the dictionary
            colorDict.Add(i, new string[] { row[0], r.ToString(), g.ToString(), b.ToString() });
        }
    }

    private void switchCamera(){
        backupCameras.Add(mainCamera);
        mainCamera = backupCameras[0];
        backupCameras.RemoveAt(0);
        //display all the available cameras
        Debug.Log("current camera: " + mainCamera.name+ " number of cameras: " + backupCameras.Count);
        foreach (WebCamDevice device in devices)
        {
            Debug.Log("device: " + device.name);
        }

    }

}
