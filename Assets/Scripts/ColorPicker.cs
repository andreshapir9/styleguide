using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ColorPicker : MonoBehaviour
{
    public Texture2D colorPicker;
    public int ImageWidth = 100;
    public int ImageHeight = 100;
    public Image testOBJ;


    void OnGui()
    {
        if (GUI.RepeatButton(new Rect(10, 10, ImageWidth, ImageHeight), colorPicker))
        {
            Vector2 clickPos = Event.current.mousePosition;
            int a = (int)clickPos.x;
            int b = (int)clickPos.y;
            Color col = colorPicker.GetPixel(a, 41 - b);
            testOBJ.color = col;
            Debug.Log(col);
        }
    }
}
