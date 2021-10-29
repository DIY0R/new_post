import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "530e88fc-11f5-4125-84ad-dfb90c56d192"
  }
});

type usersItemsTypes = {
  id: number,
  name: string,
  photos: {
    small: null | string,
    large: null | string,
  },
  status: string,
  followed: boolean,
}

type UsersType = {
  items: Array<usersItemsTypes>,
  totalCount: number,
  error: string,

};
export const users = {
  users(currentPage: number, pageSize: number) {
    return instance.get<UsersType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  UnFollow(id: number) {
    return instance.delete(`follow/${id}`);
  }
};
export const authApi = {
  authRequest() {
    return instance.get(`auth/me`);
  },
  authLoginDelete() {
    return instance.delete(`auth/login`);
  },
  authLoginPost(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha
    });
  },
  SecurityCaptcha() {
    return instance.get(`security/get-captcha-url`);
  }
};
//put
export const ProfileApi = {
  profile(id: number) {
    return instance.get(`profile/` + id);
  },
  profilePhoto(photProfile: string) {
    const formData = new FormData();
    formData.append('image', photProfile)
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile)
  },
  ProfileStatus(id: number) {
    return instance.get(`profile/status/${id}`)
  }
};
