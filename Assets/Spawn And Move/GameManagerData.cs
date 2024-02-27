using UnityEngine;

[CreateAssetMenu(fileName = "GameManagerData", menuName = "ScriptableObjects/GameManagerData", order = 2)]
public class GameManagerData : ScriptableObject
{
    public string masterPrivateKey;
    public string masterAddress;
}
