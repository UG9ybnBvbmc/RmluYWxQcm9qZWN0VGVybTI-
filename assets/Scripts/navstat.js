async function FetchNavbarData(){
    if(!localStorage.getItem('token')){return}
    const result = verifyJWT(localStorage.getItem("token"), "mysecret");
    const UserRequest = await(fetch(`${Users_API}/${(await result).payload.id}`))
    const LocalUser=await(UserRequest.json())
    document.getElementById("navbar_points").innerHTML=`<i class="fa-duotone fa-solid fa-wallet"></i>&nbsp;&nbsp;คงเหลือ : ${LocalUser.points}฿`
    $('#navbar_username').text(LocalUser.username);
    $('#navbar_email').text(LocalUser.email);
}
$(document).ready(function(){
    setInterval(chktoken,2000)
    FetchNavbarData()
})
$('#logoutbtn').click(function(){
    localStorage.removeItem('token')
    swal("ออกจากระบบ เสร็จสิ้น", "กรุณาล็อคอินใหม่", "info", {
        button: { className: 'hyper-btn-notoutline-danger' },
        closeOnClickOutside: false,
    });
    window.location.href="./index.html"
})
document.getElementById("checktoken")
    .addEventListener("click", async ()=> {
        const token = localStorage.getItem("token");
        if (!token) {
            swal("ข้อผิดพลาด !", "Token Not Found | กรุณาล็อคอินใหม่", "error", {
                button:{className:'hyper-btn-notoutline-danger'},
                closeOnClickOutside: false,
            });
            sleep(2000).then(() => { window.location.href = "../../index.html"; });
            return;
        }
        const result = await verifyJWT(token, "mysecret");
        if (!result.valid) {
            if (result.reason === "Token expired") {
                swal("ข้อผิดพลาด !", "Token Expired | กรุณาล็อคอินใหม่", "error", {
                    button:{className:'hyper-btn-notoutline-danger'},
                    closeOnClickOutside: false,
                });
                localStorage.removeItem("token");
            } else {
                swal("ข้อผิดพลาด !", "Invalid Token | กรุณาล็อคอินใหม่", "error", {
                    button:{className:'hyper-btn-notoutline-danger'},
                    closeOnClickOutside: false,
                });
            }
            sleep(2000).then(() => { window.location.href = "../../index.html"; });
        } else {
            swal("Valid Token !", "ยินดีต้อนรับ | "+result.payload.username, "success", {
                button:{className:'hyper-btn-notoutline-danger'},
                closeOnClickOutside: false,
            });
        }
    });