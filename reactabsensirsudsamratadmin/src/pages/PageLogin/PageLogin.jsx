import Logo from '../../assets/LOGORS2.png';
import bg from '../../assets/abstract_wavy_line_geometric1.png';
import { apiLogin } from '../../config/axios';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../config/authState/authSlice';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [nikUser, SetNikUser] = useState("")
  const [password, setPassowrd] = useState("");
  const dispatch = useDispatch();

  const handleChangeUserNik = (e) => {
    SetNikUser(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassowrd(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      const response = await apiLogin.post('/api/auth/login', {
        nik: nikUser,
        password: password
      })
      dispatch(loginSuccess({accessToken: response.data.data.access_token}))
      console.log(response.data.message);
      window.location.href = "/"
    } catch(error) {
      console.log(error);
    }
  }

  // const checkCookies = async () => {
  //   const accessToken = Cookies.get("access_token");
  //   if (accessToken) {
  //     if (accessToken) {
  //       try {
  //         const response = await apiLogin.get('/api/ping', {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`
  //           }
  //         });
  
  //         // Process the response as needed
  //         console.log("API Response:", response.data);
  //       } catch (error) {
  //         console.error("API Error:", error);
  //       }
  //     } else {
  //       console.log("Access token not found in cookies");
  //     }
  //     console.log("Access Token:", accessToken);
  //   } else {
  //     console.log("Access Token not found in cookies.");
  //   }
  // };


  return (
    <div className="flex bg-white">
      <div className="flex justify-center items-center w-4/6 h-screen ">
        <figure className="max-w-lg">
          <img className="h-auto max-w-sm rounded-lg" src={Logo} alt="Logo" />
          <p className="text text-black text-center font-bold">
            ABSENSI TENAGA HARIAN LEPAS
          </p>
          <p className="text text-black  text-center font-bold">
            RSUD SAMRATULANGI TONDANO
          </p>
        </figure>
      </div>
      <div className="flex justify-center items-center w-full h-screen relative">
        <img
          src={bg}
          alt="logo"
          className="absolute left-0 top-0 w-full h-full"
        />
        <div className="hero min-h-screen">
          <div className="hero-overlay"></div>
          <div className="hero-content min-w-full text-center text-neutral-content ">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white">
            
            <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">NIK</span>
                  </label>
                  <input
                    type="text"
                    value={nikUser}
                    onChange={handleChangeUserNik}
                    className="input bg-transparent rounded-none focus:outline-none input-ghost border-b-black border-l-white border-r-white border-t-white"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Password</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    className="input focus:outline-none rounded-none border-b-black border-l-white border-r-white border-t-white  bg-transparent"
                  />

                </div>
                <div className="form-control mt-6">
                  <button
                    className="btn bg-[#01A7A3] border-none text-white"
                    onClick={handleSubmit}
                    // onClick={() => {
                    //   window.location.href = '/';
                    // }}
                  >
                    Log in
                  </button>
                  {/* <button className='btn btn-primary' onClick={checkCookies}>
                    Check Cookies
                  </button> */}
                </div>
              </div> 
                  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
