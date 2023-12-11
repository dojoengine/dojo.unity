using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Dojo;
using Dojo.Torii;
using UnityEngine;

public class DemoEntityHandler : EntityHandler
{
    public override EntityInstance HandleEntityInstance(GameObject entity, string key, Dictionary<string, Model> models)
    {
        Player.HandleEntityInstance(entity, key, models);
        
        return base.HandleEntityInstance(entity, key, models);
    }
}
