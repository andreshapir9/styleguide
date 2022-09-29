using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UI_script : MonoBehaviour
{
    //we will start with 3 canvases
    //first we define the UI canvas
    [SerializeField]
    private Canvas UI_canvas;
    //then we define the camera canvas
    [SerializeField]
    private Canvas camera_canvas;
    //and finally we define the color picker canvas
    [SerializeField]
    private Canvas color_picker_canvas;

    //now we define the buttons
    [SerializeField]
    private Button camera_button;
    [SerializeField]
    private Button color_picker_button;

    // Start is called before the first frame update
    void Start()
    {
        //we start by disabling the camera canvas
        camera_canvas.enabled = false;
        //and we disable the color picker canvas
        color_picker_canvas.enabled = false;
        //we set the UI canvas to be the object that is holding thios script
        UI_canvas = this.gameObject.GetComponent<Canvas>();

    }

    // Update is called once per frame
    void Update()
    {
        
    }

    //we define a function to switch between the UI canvas and the camera canvas
    public void SwitchToCamera()
    {
        Debug.Log("Switching to camera");
        //we disable the UI canvas
        UI_canvas.enabled = false;
        //and we enable the camera canvas
        camera_canvas.enabled = true;
    }

    //we define a function to switch between the UI canvas and the color picker canvas
    public void SwitchToColorPicker()
    {
        Debug.Log("Switching to color picker");
        //we disable the UI canvas
        UI_canvas.enabled = false;
        //and we enable the color picker canvas
        color_picker_canvas.enabled = true;
    }

    //we define a function to switch between the camera canvas and the UI canvas
    public void SwitchToUI()
    {
        Debug.Log("Switching to UI");
        //we disable the camera canvas
        camera_canvas.enabled = false;
        //and we enable the UI canvas
        UI_canvas.enabled = true;
    }

    //we define a function to switch between the color picker canvas and the UI canvas
    public void SwitchToUI2()
    {
        Debug.Log("Switching to UI");
        //we disable the color picker canvas
        color_picker_canvas.enabled = false;
        //and we enable the UI canvas
        UI_canvas.enabled = true;
    }
}
