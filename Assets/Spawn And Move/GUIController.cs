using UnityEngine;

namespace System.Runtime.CompilerServices
{
    public class GUIController : MonoBehaviour
    {
        public GameManager gameManager;
        void OnGUI()
        {
            // Кнопка спавну - розміщена зверху екрану
            if (GUI.Button(new Rect(Screen.width / 2 - 150, 30, 300, 90), "Spawn"))
            {
                gameManager.SpawnEntity();
            }

            // Кнопки руху - розміщені внизу екрану
            // Кнопка вгору
            if (GUI.Button(new Rect(Screen.width / 2 - 120, Screen.height - 360, 240, 90), "Up"))
            {
                gameManager.Move(new Direction.Up());
            }

            // Кнопка вліво
            if (GUI.Button(new Rect(Screen.width / 2 - 390, Screen.height - 210, 240, 90), "Left"))
            {
                gameManager.Move(new Direction.Left());
            }

            // Кнопка вправо
            if (GUI.Button(new Rect(Screen.width / 2 + 150, Screen.height - 210, 240, 90), "Right"))
            {
                gameManager.Move(new Direction.Right());
            }

            // Кнопка вниз
            if (GUI.Button(new Rect(Screen.width / 2 - 120, Screen.height - 120, 240, 90), "Down"))
            {
                gameManager.Move(new Direction.Down());
            }
        }
    }
}