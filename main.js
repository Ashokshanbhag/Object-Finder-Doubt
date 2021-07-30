status = "";
object = [];

function preload(){


}

function setup(){

    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}
function draw(){

    image(video, 0, 0, 400, 400);
    if(status != ""){

        object_detector.detect(video, gotResult);
        for(i = 0; i < object.length; i++){

            document.getElementById("status").innerHTML = "Object Detected :D";
            document.getElementById("something_found").innerHTML = "No. of objects detected are : " + object.length;
            fill("#fc0303");
            confidence = floor(object[i].confidence * 100);
            text(object[i].label + " " + confidence + "%", object[i].x , object[i].y + 10);
            noFill();
            stroke("#fc0303");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label == object_name){

                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);

            }
            else{

                document.getElementById("status").innerHTML = "Status: " + object_name + " not found";

            }          

        }

    }

}

function start(){

    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    object_name = document.getElementById("input").value

}

function modelLoaded(){

    console.log("The model has been loaded");
    status = true;

}

function gotResult(error ,results){

    if(error){

        console.error(error);

    }
    else{

        console.log(results);
        object = results;

    }

}