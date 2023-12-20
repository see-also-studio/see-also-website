let allUrlParameters = null;

export function getUrlParameter(parameter, fallbackValue = null){
  if (allUrlParameters === null) {
    getAllUrlParameters();
  }

  return allUrlParameters[parameter] || fallbackValue || 'no url parameter or fallback found';
}

function getAllUrlParameters() {
  allUrlParameters = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    allUrlParameters[key] = decodeURIComponent(value);
  });
}
