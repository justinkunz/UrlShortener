$(document).ready(() => {
  showSpinner(false);
  $(".shrt-btn").on("click", shortenUrl);
});

const shortenUrl = async e => {
  e.preventDefault();
  const url = $(".shrt-inpt").val();
  if (!url) return;
  showSpinner(true);
  const { short } = await $.post({
    url: "/api/url",
    data: { url }
  });
  showSpinner(false);
  showShortUrl(short);
};

const showSpinner = show => {
  const action = show ? "addClass" : "removeClass";
  $(".app")[action]("spinner-bg-fade");
  $(".spinner")[action]("spinner-active");
};

const showCopySuccess = () => {
  Swal.fire({
    title: "Successly Copied link",
    icon: "success"
  });
};
const showShortUrl = short => {
  Swal.fire({
    html: `<span class='title'>Your shortened URL</span>
      <h1>${short}</h1>`,
    showConfirmButton: true,
    focusConfirm: false,
    confirmButtonText: "Copy Link",
    preConfirm: () => {
      copyToClipboard(short);
      showCopySuccess();
    }
  });
};

const copyToClipboard = str => {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(str).select();
  document.execCommand("copy");
  $temp.remove();
};
