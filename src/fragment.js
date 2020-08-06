export const USER_FRAGMENT = `
    id
    username
    avatar
`;//UserParts는 신경쓰지말고 User만 이름이 같아야한다


export const COMMENT_FRAGMENT = `
        id
        text
        user {
            ${USER_FRAGMENT}
        }
`;


export const FILE_FRAGMENT =`
        id
        url
`;

export const FULL_POST_FRAGMENT=`
fragment PostParts on Post{
    id
  location
  caption
  files{
      ${FILE_FRAGMENT}
  }
  comments{
      ${COMMENT_FRAGMENT}
  }
  user{
      ${USER_FRAGMENT}
  }
}
`;
export const MESSAGE_FRAGMENT= `
    id
    text
    to{
        ${USER_FRAGMENT}
    }
    from{
        ${USER_FRAGMENT}
    }
`;
export const ROOM_FRAGMENT =`
    fragment RoomParts on Room{
        id
        participants{
            ${USER_FRAGMENT}
        }
        messages{
            ${MESSAGE_FRAGMENT}
        }
    }
`;

