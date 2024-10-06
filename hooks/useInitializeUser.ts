// // hooks/useInitializeUser.ts
// 'use client'
// import { useEffect } from 'react';
// import { useSetRecoilState } from 'recoil';
// import { userState } from '@/recoil/atoms/useratom';
// import jwtDecode from 'jwt-decode';
// import jwt from 'jsonwebtoken'

// export const useInitializeUser = () => {
//   const setUser = useSetRecoilState(userState);

//   useEffect(() => {
//     const token = document.cookie.split(';').find('token');
//     if (token) {
//       const decoded = jwt.decode(token);
//       setUser(decoded);  // Update the user state in Recoil
//     }
//   }, [setUser]);
// };
