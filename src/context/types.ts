export type AuthProps = {
    userData: UserData,
    addUser: (userData: UserData) => void,
    logoutUser: () => void

}

export type UserData = {
    email: string,
    familyName: string,
    givenName: string,
    googleId: string,
    imageUrl: string,
    name: string
}

