import { atom } from "recoil";

// 유저 정보
export const UserState = atom({
  key: "userState",
  default: {
    nickname: "",
    profileImage: "",
  }
});

// like 정보
export const likeListState = atom({
  key: 'likeListState',
  default: [],
})

// 내 목소리 정보
export const myVoiceState = atom({
  key: "myVoiceState",
  default: [],
})

// BuyCount
export const buyCountState = atom({
  key: "buyCount",
  default: [],
})

// BuyList
export const buyListState = atom({
  key: "buylist",
  default: [],
})

