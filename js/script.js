$(() => {
  var map = L.map("map").setView([-7.983908, 112.621391], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  function addMarker(lat, lng, location, description) {
    var marker = L.marker([lat, lng], { draggable: true })
      .addTo(map)
      .bindPopup(
        `Name: ${location}<br>Description: ${description}<br>Location: [${lat}, ${lng}]`
      );

    // update: drag dan konfirmasi ubah titik POI
    marker.on("dragend", function (e) {
      var newLatLng = e.target.getLatLng();
      var confirmModal = new bootstrap.Modal(
        document.getElementById("confirmModal")
      );
      confirmModal.show();

      $("#confirmModal input[name='lng']").val(newLatLng.lng);
      $("#confirmModal input[name='lat']").val(newLatLng.lat);
      $("#confirmModal input[name='loc']").val(location);
      $("#confirmModal textarea[name='desc']").val(description);

      $("#confirmModal").on("submit", "form", function (e) {
        e.preventDefault();
        let loc = $("#confirmModal input[name='loc']").val();
        let desc = $("#confirmModal textarea[name='desc']").val();

        $("#confirmModal .btn-close, #confirmModal .btn-danger").on(
          "click",
          function () {
            marker.setLatLng(oldLatLng);
          }
        );

        $.post("php/marker-update.php", {
          oldLat: lat,
          oldLng: lng,
          newLat: newLatLng.lat,
          newLng: newLatLng.lng,
          location: loc,
          description: desc,
        })
          .done((data) => {
            console.log("Success:", data);
            marker.setLatLng(newLatLng);
            marker.bindPopup(
              `Name: ${loc}<br>Description: ${desc}<br>Location: [${newLatLng.lat}, ${newLatLng.lng}]`
            );
            confirmModal.hide();
          })
          .fail((error) => console.error("Error saving marker:", error));
      });
    });

    // delete: klik kanan dan konfirmasi hapus POI
    marker.on("contextmenu", function (e) {
      var deleteModal = new bootstrap.Modal(
        document.getElementById("deleteModal")
      );
      deleteModal.show();
      
      $("#deleteModal").on("submit", "form", function (e) {
        e.preventDefault();
        $.post("php/marker-delete.php", {
          latitude: lat,
          longitude: lng,
        })
        .done((data) => {
          console.log("Marker deleted successfully:", data);
          map.removeLayer(marker);
          deleteModal.hide();
          })
          .fail((error) => console.error("Error deleting marker:", error));
      });
    });
    
  }

  // read: menampilkan seluruh marker yang tersimpan saat web baru dibuka
  $.get("php/marker-read.php", function (data) {
    const markers = data.trim().split("\n");
    markers.forEach((marker) => {
      const [lat, lng, location, description] = marker.split(",");
      addMarker(lat, lng, location, description);
    });
  }).fail((error) => console.error("Error saving marker:", error));

  // create: menambahkan marker saat map ditekan
  map.on("click", function (e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    var addModal = new bootstrap.Modal(document.getElementById("addModal"));
    addModal.show();

    $("#addModal input[name='lng']").val(lng);
    $("#addModal input[name='lat']").val(lat);

    $("#addModal").off("submit").on("submit", "form", function (e) {
      e.preventDefault();
      let loc = $("#addModal input[name='loc']").val();
      let desc = $("#addModal textarea[name='desc']").val();

      addMarker(lat, lng, loc, desc);

      $.post("php/marker-create.php", {
        location: loc,
        description: desc,
        latitude: lat,
        longitude: lng,
      })
        .done((data) => console.log("Success:", data))
        .fail((error) => console.error("Error saving marker:", error));

      addModal.hide();
      $(this)[0].reset();
    });
  });
});
