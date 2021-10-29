import {
  ProfileApi
} from "../api/server-requests";
import {
  stopSubmit
} from 'redux-form';
import {
  ProfileType,
  photosType,
  postType
} from "../types/types";
const FOLLOWING_IN_PROFGRESS = "FOLLOWING_IN_PROFGRESS";
const PROFILE_PHOTO_SAVE = "PROFILE_PHOTO_SAVE";
const ADD_POS = "ADD_POS";
const PROFILE = "PROFILE";
const IS_LOADER = 'IS_LOADER';
const STATUS_GET = 'STATUS_GET';
const SET_LIKE = 'SET_LIKE'
const initialState = {
  postGet: "",
  profile: null as ProfileType | null,
  isLoader: false,
  status: '',
  post: [{
    id: 1,
    img: "https://png.pngtree.com/element_our/20190604/ourmid/pngtree-user-avatar-boy-image_1482937.jpg",
    text: "hello world",
    like: false
  },
  {
    id: 2,
    img: "https://i.pinimg.com/originals/ed/61/8c/ed618c92a295b74449839ab5f6f947ee.jpg",
    text: "test",
    like: true
  },
  {
    id: 3,
    img: "https://img.favpng.com/2/12/12/computer-icons-portable-network-graphics-user-profile-avatar-png-favpng-L1ihcbxsHbnBKBvjjfBMFGbb7.jpg",
    text: "TypeScript",
    like: false
  }
  ] as Array<postType>,

};
type InitialState = typeof initialState;
const ProfileRedcer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case ADD_POS: {
      let addPOst = {
        id: 4,
        img: "https://i.pinimg.com/originals/ed/61/8c/ed618c92a295b74449839ab5f6f947ee.jpg",
        text: action.postGet,
        like: false
      };
      return {
        ...state,
        post: [addPOst, ...state.post]
        // postGet:''
      };
    }
    case PROFILE: {
      return {
        ...state,
        profile: action.profile
      };
    }
    case IS_LOADER: {
      return {
        ...state,
        isLoader: action.isLoad
      }
    }
    case PROFILE_PHOTO_SAVE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photProfile
        } as ProfileType,

      };
    }
    case SET_LIKE: {

      return {
        ...state,
        post: [...state.post].map(post => {
          if (post.id === action.id) {

            post.like = !post.like
            return post
          }
          return post
        })

      }
    }
    case STATUS_GET: {
      return {
        ...state,
        status: action.status,
      }
    }

    default:
      return state;
  }
};


type addPostActionType = {
  type: typeof ADD_POS,
  postGet: string,
}
export const addPost = (postGet: string): addPostActionType => ({
  type: ADD_POS,
  postGet
})

type ProfileActionType = {
  type: typeof PROFILE,
  profile: ProfileType
}

const Profile = (profile: ProfileType): ProfileActionType => ({
  type: PROFILE,
  profile
})

type ProfielPhotoActionType = {
  type: typeof PROFILE_PHOTO_SAVE,
  photProfile: photosType
}
const ProfielPhoto = (photProfile: photosType): ProfielPhotoActionType => ({
  type: PROFILE_PHOTO_SAVE,
  photProfile
})


type isLoaderActionType = {
  type: typeof IS_LOADER,
  isLoad: boolean,
}

const isLoader = (isLoad: boolean): isLoaderActionType => ({
  type: IS_LOADER,
  isLoad
})

type statusGetActionType = {
  type: typeof STATUS_GET,
  status: string,
}
const statusGet = (status: string): statusGetActionType => ({
  type: STATUS_GET,
  status
})
type setLikeType = {
  type: typeof SET_LIKE,
  id: number
}
export const setLike = (id: number): setLikeType => ({
  type: SET_LIKE,
  id
})

export const ProfileSet = (id: number) => async (dispatch: any) => {
  const res = await ProfileApi.profile(id)
  dispatch(Profile(res.data))
};
export const ProfilePhoto = (photProfile: string) => async (dispatch: any) => {
  dispatch(isLoader(false))
  const response = await ProfileApi.profilePhoto(photProfile)
  if (response.data.resultCode === 0) {
    dispatch(isLoader(true))
    dispatch(ProfielPhoto(response.data.data.photos))
  }
};

export const SaveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  let id = getState().auth.id
  const response = await ProfileApi.saveProfile(profile)

  if (response.data.resultCode === 0) {
    dispatch(ProfileSet(id))
  } else {
    let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
    dispatch(stopSubmit('fromData', {
      _error: messages
    }))
    return Promise.reject(messages)
  }
};

export const ProfileStatusGet = (id: number) => async (dispatch: any) => {
  const response = await ProfileApi.ProfileStatus(id)
  dispatch(statusGet(response.data))
}
export default ProfileRedcer