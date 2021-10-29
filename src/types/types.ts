export type postType = {
  id: number,
  img: string | null,
  text: string,
  like: boolean
};

export type contactsType = {
  github: string,
  vk: string,
  facebook: string,
  instagram: string,
  twitter: string,
  website: string,
  youtube: string,
  mainLink: string,
}
export type photosType = {
  small: string | null,
  large: string | null,
}
export type ProfileType = {
  userId: number,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string
  contacts: contactsType,
  photos: photosType,
}

export type UserType = {
  name: string,
  id: number,
  status: string,
  photos: photosType,
  followed: boolean,
};