using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;

public class MyDojoBindings 
{

    [DllImport("dojo_unity_bindings")]
    public static extern int add(int a, int b);
   
}
