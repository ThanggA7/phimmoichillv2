import { useState } from "react";
function Login() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full bg-[#191b2cc9] p-4">
      <div className=" flex items-center justify-center min-h-screen">
        <div className="bg-gray-800 text-white w-full max-w-md rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">
            {isRegister ? "Tạo tài khoản mới" : "Đăng nhập"}
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            {isRegister ? (
              <>
                Nếu bạn đã có tài khoản,{" "}
                <span
                  className="text-yellow-400 hover:underline cursor-pointer"
                  onClick={() => setIsRegister(false)}
                >
                  đăng nhập
                </span>
              </>
            ) : (
              <>
                Nếu bạn chưa có tài khoản,{" "}
                <span
                  className="text-yellow-400 hover:underline cursor-pointer"
                  onClick={() => setIsRegister(true)}
                >
                  đăng ký ngay
                </span>
              </>
            )}
          </p>
          <form>
            {isRegister && (
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-2"
                >
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Nhập tên hiển thị"
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Nhập email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Nhập mật khẩu"
              />
            </div>
            {isRegister && (
              <div className="mb-4">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium mb-2"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Xác nhận mật khẩu"
                />
              </div>
            )}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-yellow-500"
                />
                <span className="ml-2 text-sm text-gray-400">
                  Tôi không phải là người máy
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600"
            >
              {isRegister ? "Đăng ký" : "Đăng nhập"}
            </button>
          </form>
          {!isRegister && (
            <p className="text-center text-sm text-gray-400 mt-4 hover:underline cursor-pointer">
              Quên mật khẩu?
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
