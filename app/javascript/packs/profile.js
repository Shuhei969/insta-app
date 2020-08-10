import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
axios.defaults.headers.common[`X-CSRF-Token`] = csrfToken()

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

$(document).on("DOMContentLoaded", function () {
  $("#profile_avatar").on("change", function (e) {
    var files = e.target.files; // 新たにアタッチした画像ファイル
    var d = new $.Deferred().resolve(); //defferを作成、ここで定義されたアクションが解決(resolve)するとこのfunctionから抜けだす？
    $.each(files, function (i, file) {
      d = d.then(function () {
        return previewImage(file);
      });
    });

    $(".header-flex-right").show(); //ファイルがアタッチされたら保存ボタンを表示させる
  });

  var previewImage = function (imageFile) {
    var reader = new FileReader();
    var img = new Image();
    var def = $.Deferred();
    reader.onload = function (e) {
      // 画像を表示
      $(".profile-avatar-preview").empty();
      $(".profile-avatar-preview").append(img);
      img.src = e.target.result;
      def.resolve(img);
    };
    reader.readAsDataURL(imageFile);
    return def.promise();
  };
});
