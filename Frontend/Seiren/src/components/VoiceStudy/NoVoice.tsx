import { useNavigate } from "react-router-dom";
import { customAxios } from "../../libs/axios";

function NoVoice() {
  const navigate = useNavigate();

  const makeVoice = () => {
    customAxios.post("voices")
      .then((res) => {
        console.log('목소리 초기 생성 성공', res);
        navigate("/voice-study");
      })
      .catch((error) => console.log(error));
  };

  return(
    <div>
      <div>
          <button onClick={makeVoice}>목소리 등록</button>
      </div>
    </div>
  )
}

export default NoVoice;
