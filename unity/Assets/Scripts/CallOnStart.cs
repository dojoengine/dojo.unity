using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CallOnStart : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        int r1 = MyDojoBindings.add(int.MaxValue,1);
        Debug.Log(r1);

        int r2 = MyDojoBindings.add(3, 1);
        Debug.Log(r2);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
