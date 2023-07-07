let videoElement = document.getElementById('videoElement');
    let displayMediaStream = null;
  
    function startScreenSharing() {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true })
          .then(function(stream) {
            displayMediaStream = stream;
            videoElement.srcObject = stream;
          })
          .catch(function(error) {
            console.error('Error al compartir la pantalla: ', error);
          });
      } else {
        console.error('La API de captura de medios no está soportada en este navegador.');
      }
    }
    
    function startCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
            displayMediaStream = stream;
            videoElement.srcObject = stream;
          })
          .catch(function(error) {
            console.error('Error al activar la cámara: ', error);
          });
      } else {
        console.error('La API de captura de medios no está soportada en este navegador.');
      }
    }
    
    function stopMedia() {
      if (displayMediaStream) {
        displayMediaStream.getTracks().forEach(function(track) {
          track.stop();
        });
        videoElement.srcObject = null;
        displayMediaStream = null;
      }
    }