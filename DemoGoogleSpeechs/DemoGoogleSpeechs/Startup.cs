﻿using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin;
[assembly: OwinStartup(typeof(DemoGoogleSpeechs.Startup))]
namespace DemoGoogleSpeechs
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}