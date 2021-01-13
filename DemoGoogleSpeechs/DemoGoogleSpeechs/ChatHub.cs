using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Media;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Google.Cloud.Speech.V1;
using Google.Cloud.TextToSpeech.V1;
using Google.Cloud.Translation.V2;
using Grpc.Core;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.SignalR;
using NAudio.Wave;

namespace DemoGoogleSpeechs
{
    public class ChatHub : Hub
    {
        WaveInEvent waveInTranslation =null;
        WaveInEvent waveInSpeechToText = null;
        string fileAuthenGoogleApi = $"{HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["Authen.Google.Api"])}";    
        string fileAudioTextToSpeech = $"{HttpContext.Current.Server.MapPath($"{Path.Combine(ConfigurationManager.AppSettings["TextToSpeech.Output.Dir"], $"output_{DateTime.Now.ToString("ddMMyyyyHHmmss")}.mp3")}")}";
        //$"{Path.Combine(ConfigurationManager.AppSettings["TextToSpeech.Output.Dir"], $"output_{DateTime.Now.ToString("ddMMyyyyHHmmss")}.mp3")}";       
        public void Authen()
        {
            var keyAunthenApi= $"{ConfigurationManager.AppSettings["AuthenGoogleApi"]}";
            Environment.SetEnvironmentVariable(keyAunthenApi, fileAuthenGoogleApi);
        }
        public void PlayAudio(string fileAudio)
        {
            SoundPlayer player = new SoundPlayer(fileAudio);
            player.Play();
        }
        public void TextToSpeechTranslation(string language,string text)
        {
            string name = string.Empty;
            string textLangguage = string.Empty;
            if(language.Equals("vi"))
            {
                name = "en-US-Wavenet-D";
                textLangguage = "en-US";              
            }
            else
            {
                name = "vi-VN-Wavenet-A";
                textLangguage = "vi-VN";
            }
            Authen();
            TextToSpeechClient client = TextToSpeechClient.Create();
            var response = client.SynthesizeSpeech(new SynthesizeSpeechRequest
            {
                Input = new SynthesisInput
                {
                    Text = text
                },
                Voice = new VoiceSelectionParams
                {
                    LanguageCode = textLangguage, 
                    SsmlGender = SsmlVoiceGender.Female,
                    Name = name
                },
                AudioConfig = new AudioConfig
                {
                    AudioEncoding = AudioEncoding.Linear16,
                    Pitch = 1,
                    SpeakingRate = 1
                }

            });
            FileStream output = new FileStream(fileAudioTextToSpeech, FileMode.Create);        
            response.AudioContent.WriteTo(output);
            output.Dispose();
        }
        public void TextToSpeech(string language, string text)
        { 
            string name = string.Empty;
            string textLangguage = string.Empty;
            if (language.Equals("vi"))
            {
                name = "vi-VN-Wavenet-A";
                textLangguage = "vi-VN";               
            }
            else
            {
                name = "en-US-Wavenet-D";
                textLangguage = "en-US";
            }
            Authen();
            TextToSpeechClient client = TextToSpeechClient.Create();
            var response = client.SynthesizeSpeech(new SynthesizeSpeechRequest
            {
                Input = new SynthesisInput
                {
                    Text = text
                },
                Voice = new VoiceSelectionParams
                {
                    LanguageCode = textLangguage,
                    SsmlGender = SsmlVoiceGender.Female,
                    Name = name
                },
                AudioConfig = new AudioConfig
                {
                    AudioEncoding = AudioEncoding.Linear16,
                    Pitch = 1,
                    SpeakingRate = 1
                }

            });
            FileStream output = new FileStream(fileAudioTextToSpeech, FileMode.Create);
            response.AudioContent.WriteTo(output);
            output.Dispose();
            PlayAudio(fileAudioTextToSpeech);
        }     
        public string Translation(string languega,string text)
        {
            string outLanguage = string.Empty;            
            if(languega.Equals("vi"))
            {
                outLanguage = "en";
            }
            else
            {
                outLanguage = "vi";
            }         
            Authen();
            Console.OutputEncoding = Encoding.UTF8;
            TranslationClient client = TranslationClient.Create();
            var response = client.TranslateText(
                text: text,
                targetLanguage: outLanguage,
                sourceLanguage: languega);        
             return response.TranslatedText;           
        }

        public void TranslationListen(string language,string textInput)
        {
            string textOutPut = string.Empty;
            textOutPut = Translation(language, textInput);
            TextToSpeechTranslation(language, textOutPut);
            if (textOutPut != null)
            {                        
                PlayAudio(fileAudioTextToSpeech);
            }
        }
        public void SpeechToText(string language)
        {
            string speechLanguage = string.Empty;
            string translateLanguage = string.Empty;
            if(language.Equals("vi"))
            {
                speechLanguage = "vi-VN";
                translateLanguage = "en";
            } 
            else
            {
                speechLanguage = "en-US";
                translateLanguage = "vi";
            }            
            Authen();
            var speech = SpeechClient.Create();
            //TranslationClient clientTranslation = TranslationClient.Create();
            var streamingCall = speech.StreamingRecognize();
            // Write the initial request with the config.
            streamingCall.WriteAsync(
               new StreamingRecognizeRequest()
               {
                   StreamingConfig = new StreamingRecognitionConfig()
                   {
                       Config = new RecognitionConfig()
                       {
                           EnableAutomaticPunctuation = true,
                           Encoding = RecognitionConfig.Types.AudioEncoding.Linear16,
                           SampleRateHertz = 16000,
                           LanguageCode = speechLanguage,                    
                       },
                       InterimResults = true,
                   }
               });
            
            // Print responses as they arrive.
            DateTime dateTime = DateTime.Now;
            string time = dateTime.ToString().Replace(":", "-").Replace("/", "-");
            //string filePath = @"C:\Users\nghiatt\VISUAL STUDIO\PROJECT\SpeechToText\SpeechToText" + time + ".txt";
            //FileStream fileStream = new FileStream(filePath, FileMode.Create); // khai báo để ghi vào file
            //StreamWriter writerFile = new StreamWriter(fileStream, Encoding.UTF8);
            Task printResponses = Task.Run(async () =>
            {
                Console.OutputEncoding = Encoding.UTF8;
                var responseStream = streamingCall.GetResponseStream();                             
                while (await responseStream.MoveNextAsync())
                {
                    StreamingRecognizeResponse response = responseStream.Current;
                    foreach (StreamingRecognitionResult rs in response.Results)
                    {
                        Clients.All.loadTyping();                       
                        if (rs.IsFinal)
                        {
                            string transcript = rs.Alternatives.Last().Transcript;                           
                            Clients.All.addTextToPage(transcript);                          
                        }
                    }
                }
            });
            // Read from the microphone and stream to API.
            var writeLock = new object();
            var writeMore = true;
            waveInSpeechToText = new WaveInEvent();
            waveInSpeechToText.DeviceNumber = 0;
            waveInSpeechToText.WaveFormat = new WaveFormat(16000, 1);
            waveInSpeechToText.DataAvailable +=
                (object sender, WaveInEventArgs args) =>
                {
                    lock (writeLock)
                    {
                        if (!writeMore)
                        {
                            return;
                        }
                        streamingCall.WriteAsync(
                            new StreamingRecognizeRequest()
                            {
                                AudioContent = Google.Protobuf.ByteString
                                    .CopyFrom(args.Buffer, 0, args.BytesRecorded)
                            }).Wait();
                    }
                };
            waveInSpeechToText.StartRecording();
        }
        public void SpeakTranslation(string language)
        {
            string speechLanguage = string.Empty;
            string translateLanguage = string.Empty;
            if (language.Equals("vi"))
            {
                speechLanguage = "vi-VN";
                translateLanguage = "en";
            }
            else
            {
                speechLanguage = "en-US";
                translateLanguage = "vi";
            }
            Authen();
            var speech = SpeechClient.Create();
            TranslationClient clientTranslation = TranslationClient.Create();
            var streamingCall = speech.StreamingRecognize();
            // Write the initial request with the config.
            streamingCall.WriteAsync(
               new StreamingRecognizeRequest()
               {
                   StreamingConfig = new StreamingRecognitionConfig()
                   {
                       Config = new RecognitionConfig()
                       {
                           EnableAutomaticPunctuation = true,
                           Encoding = RecognitionConfig.Types.AudioEncoding.Linear16,
                           SampleRateHertz = 16000,
                           LanguageCode = speechLanguage,
                       },
                       InterimResults = true,
                   }
               });

            // Print responses as they arrive.
            DateTime dateTime = DateTime.Now;
            string time = dateTime.ToString().Replace(":", "-").Replace("/", "-");
            //string filePath = @"C:\Users\nghiatt\VISUAL STUDIO\PROJECT\SpeechToText\SpeechToText" + time + ".txt";
            //FileStream fileStream = new FileStream(filePath, FileMode.Create); // khai báo để ghi vào file
            //StreamWriter writerFile = new StreamWriter(fileStream, Encoding.UTF8);
            Task printResponses = Task.Run(async () =>
            {
                Console.OutputEncoding = Encoding.UTF8;
                var responseStream = streamingCall.GetResponseStream();
                while (await responseStream.MoveNextAsync())
                {
                    StreamingRecognizeResponse response = responseStream.Current;
                    foreach (StreamingRecognitionResult rs in response.Results)
                    {
                        Clients.All.loadTypingTranslation();
                        if (rs.IsFinal)
                        {
                            string transcript = rs.Alternatives.Last().Transcript;
                            Clients.All.addTextToPageTranslation(transcript);

                            Clients.All.hideTypingTranslation();
                            var Translation = clientTranslation.TranslateText(
                            text: transcript,
                            targetLanguage: translateLanguage,
                            sourceLanguage: language);
                            Clients.All.addTranslation(Translation.TranslatedText);
                        }
                    }
                }
            });
            // Read from the microphone and stream to API.
            var writeLock = new object();
            var writeMore = true;
            waveInTranslation = new WaveInEvent();
            waveInTranslation.DeviceNumber = 0;
            waveInTranslation.WaveFormat = new WaveFormat(16000, 1);
            waveInTranslation.DataAvailable +=
                (object sender, WaveInEventArgs args) =>
                {
                    lock (writeLock)
                    {
                        if (!writeMore)
                        {
                            return;
                        }
                        streamingCall.WriteAsync(
                            new StreamingRecognizeRequest()
                            {
                                AudioContent = Google.Protobuf.ByteString
                                    .CopyFrom(args.Buffer, 0, args.BytesRecorded)
                            }).Wait();
                    }
                };
            waveInTranslation.StartRecording();
        }
        public void stopMicro()
        {
           //if(waveIn!=null)
           // {
           //     waveIn.StopRecording();
           //     //waveIn.Dispose();
           // }
            //if (waveIn != null)
            //{
            //   // waveIn.StopRecording();
            //    waveIn.Dispose();
            //}
              
            //try
            //{
            //    waveIn.StopRecording();
            //    waveIn = null;
            //}
            //catch
            //{
            //    waveIn = null;
            //}
        }
    }
}