const bodyFrame = document.getElementById("bodyiframe");

// Taken from https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === "?"
    ? queryString.substr(1)
    : queryString
  ).split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
}

if (document.location.pathname.includes("CountMeInService.asp")) {
  const els = document.getElementsByClassName("button0");

  for (var i = 0; i < els.length; i++) {
    console.log(els[i].getAttribute("onclick"));
    if (els[i].value == "Back to planning screen") {
      const newEl = document.createElement("input");
      newEl.type = "button";
      newEl.value = "Back to planning screen";
      newEl.className = "button0";
      newEl.onclick = function() {
        window.close();
      };

      els[i].parentElement.replaceChild(newEl, els[i]);
      break;
    }
  }
}

if (bodyFrame) {
  bodyFrame.onload = function() {
    if (bodyFrame.contentWindow.location.href.includes("DutyInformation4")) {
      console.log("DIPS Extended - Injecting add volunteer button");

      const params = parseQuery(bodyFrame.contentWindow.location.search);
      const doc = bodyFrame.contentDocument;
      const el = document.createElement("a");

      el.text = "Add Volunteer";
      el.href = `CountMeInService.asp?show=add&CMISClosed=False&from=DutySystem-List&filter=&showyear=${
        params.showyear
      }&showmonth=${params.showmonth}&showday=&duty=${
        params.duty
      }&page=5&pagenumber=0&addmembers=true&closebutton=showonadd&UID='`;

      el.onclick = function() {
        var win = window.open(
          this.href,
          "targetWindow",
          "toolbar=no,location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=750, height=600"
        );
        win.onbeforeunload = function() {
          bodyFrame.contentWindow.location.reload(true);
        };
        return false;
      };

      doc.getElementsByName("form1")[0].children[1].appendChild(el);
    }
  };
}
