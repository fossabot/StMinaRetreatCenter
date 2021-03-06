using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace StMinaRetreat.Controllers
{
    [Route("api/[controller]")]
    public class NewslettersController : Controller
    {
        [HttpGet()]
        public IEnumerable<NewsletterPath> GetNewsletterDirectories()
        {
            List<NewsletterPath> paths = new List<NewsletterPath>();

            foreach (var path in Directory.GetDirectories("./Newsletters"))
            {
                paths.Add(new NewsletterPath { path = path, name = $"{path.Split('\\').LastOrDefault()}" });
            }

            return paths;
        }

        [HttpGet("{volume}")]
        public IEnumerable<NewsletterPath> GetNewletters(string volume)
        {
            List<NewsletterPath> paths = new List<NewsletterPath>();

            foreach (var path in Directory.GetFiles($"./Newsletters/{volume}"))
            {
                paths.Add(new NewsletterPath { path = path, name = $"{volume}&nbsp;&nbsp;&nbsp; <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i> &nbsp;&nbsp;&nbsp; {path.Split('\\').LastOrDefault()}" });
            }

            return paths;
        }

        [HttpGet("{volume}/{quarter}")]
        public FileContentResult GetNewsletter(string volume, string quarter)
        {

            HttpContext.Response.ContentType = "application/pdf";
            FileContentResult result = new FileContentResult(System.IO.File.ReadAllBytes($"./Newsletters/{volume}/{quarter}"), "application/pdf")
            {
                FileDownloadName = $"{quarter}.pdf"
            };
            return result;
        }


        [HttpPost("{volume}/{quarter}")]
        public bool PostNewsletter(PostNewsletter request)
        {
            if (request.password != "StMina2017")
            {
                return false;
            }

            if (!Directory.Exists($"./Newsletters/{request.volume}"))
            {
                Directory.CreateDirectory($"./Newsletters/{request.volume}");
            }

            FileStream stream = new FileStream($"./Newsletters/{request.volume}", FileMode.Create, FileAccess.Write);
            stream.Write(request.data, 0, request.data.Length);

            stream.Dispose();



            return true;
        }
    }

    public class NewsletterPath
    {
        public string path { get; set; }
        public string name { get; set; }
    }

    public class PostNewsletter
    {
        public string volume;
        public byte[] data;
        public string password;
    }
}
