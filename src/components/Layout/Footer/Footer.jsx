import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faInstagram,
  faFacebook,
  faThreads,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <div className="w-full bg-[#0F111A] p-10">
      <div className="flex items-center gap-7 lg:flex-row flex-col flex-wrap">
        <a href="#">
          <a className="text-[25px] font-extrabold text-white" href="/">
            NOAZMOVIE
          </a>
        </a>
        <div className="lg:block hidden w-[1px] h-[30px] bg-white"></div>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#282B3A]">
            <a href="#!">
              <FontAwesomeIcon className="text-white" icon={faTiktok} />
            </a>
          </div>
          <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#282B3A]">
            <a href="#!">
              <FontAwesomeIcon className="text-white" icon={faInstagram} />
            </a>
          </div>
          <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#282B3A]">
            <a href="#!">
              <FontAwesomeIcon className="text-white" icon={faFacebook} />
            </a>
          </div>
          <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#282B3A]">
            <a href="#!">
              <FontAwesomeIcon className="text-white" icon={faThreads} />
            </a>
          </div>
          <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#282B3A]">
            <a href="#!">
              <FontAwesomeIcon className="text-white" icon={faYoutube} />
            </a>
          </div>
          <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#282B3A]">
            <a href="#!">
              <FontAwesomeIcon className="text-white" icon={faThreads} />
            </a>
          </div>
        </div>
      </div>

      <nav className="mt-2">
        <ul className="flex items-center gap-5 text-white text-[14px] flex-wrap text-center">
          <li>
            <a href="#!">Hỏi đáp</a>
          </li>
          <li>
            <a href="#!">Chính sách bảo mật</a>
          </li>
          <li>
            <a href="#!">Điều khoản sử dụng</a>
          </li>
          <li>
            <a href="#!">Giới thiệu</a>
          </li>
          <li>
            <a href="#!">Liên hệ</a>
          </li>
        </ul>
      </nav>
      <p className="text-[14px] text-[#ffffffbe] mt-2">
        Website chính thức và duy nhất của PhimChill. Hiện tại chúng mình chỉ có
        duy nhất một website chứ không có website nào khác nhé!
      </p>
      <p className="text-[14px] text-[#ffffffbe] mt-2">© 2024 PhimHay</p>
    </div>
  );
}

export default Footer;
