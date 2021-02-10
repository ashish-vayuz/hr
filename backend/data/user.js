import bcrypt from 'bcryptjs'
const user = [
    {
        "contact": 0,
        "OTP": "5982",
        "verified": true,
        "location": "Delhi",
        "myChallenges": [
            "60236fd7a7f6b8403cdfcdff",
            "6023701fa7f6b8403cdfce00"
        ],
        "participatedChallenges": [],
        "bookmarks": [],
        "liked": [],
        "categories": [
            "60105e075241745f74c22bbf",
            "60105e075241745f74c22bc0"
        ],
        "followings": [
            "60236f621ba16a0015e22359",
            "60236f2d1ba16a0015e22358"
        ],
        "totalFollowings": 2,
        "followers": [
            "60236f621ba16a0015e22359"
        ],
        "totalFollowers": 1,
        "coinsEarned": 0,
        "likes": 0,
        "image": "/uploads\\ProfileImg\\image-1611683137144.png",
        "active": true,
        "isDeleted": false,
        "totalReports": 0,
        "isReviewer": false,
        "reviewerRequest": false,
        "_id": "60236ef61ba16a0015e22357",
        "name": "Ashish Raj",
        "email": "ashish.vayuz@gmail.com",
        "password": bcrypt.hashSync('123456', 10),
        "reports": [],
        "createdAt": "2021-02-10T05:28:22.087Z",
        "updatedAt": "2021-02-10T05:35:57.398Z",
        "__v": 6
    },
    {
        "contact": 0,
        "OTP": "8329",
        "verified": true,
        "location": "Delhi",
        "myChallenges": [],
        "participatedChallenges": [],
        "bookmarks": [],
        "liked": [],
        "categories": [
            "60105e075241745f74c22bbf",
            "60105e075241745f74c22bc0"
        ],
        "followings": [],
        "totalFollowings": 0,
        "followers": [
            "60236ef61ba16a0015e22357"
        ],
        "totalFollowers": 1,
        "coinsEarned": 0,
        "likes": 0,
        "image": "/uploads\\ProfileImg\\image-1611683137144.png",
        "active": true,
        "isDeleted": false,
        "totalReports": 0,
        "isReviewer": false,
        "reviewerRequest": false,
        "_id": "60236f2d1ba16a0015e22358",
        "name": "Ashish Raj",
        "email": "prince.vayuz@gmail.com",
        "password": bcrypt.hashSync('123456', 10),
        "reports": [],
        "createdAt": "2021-02-10T05:29:17.409Z",
        "updatedAt": "2021-02-10T05:34:58.116Z",
        "__v": 2
    },
    {
        "contact": 0,
        "OTP": "5456",
        "verified": true,
        "location": "Delhi",
        "myChallenges": [],
        "participatedChallenges": [],
        "bookmarks": [],
        "liked": [],
        "categories": [
            "60105e075241745f74c22bbf",
            "60105e075241745f74c22bc0"
        ],
        "followings": [
            "60236ef61ba16a0015e22357"
        ],
        "totalFollowings": 1,
        "followers": [
            "60236ef61ba16a0015e22357"
        ],
        "totalFollowers": 1,
        "coinsEarned": 0,
        "likes": 0,
        "image": "/uploads\\ProfileImg\\image-1611683137144.png",
        "active": true,
        "isDeleted": false,
        "totalReports": 0,
        "isReviewer": false,
        "reviewerRequest": false,
        "_id": "60236f621ba16a0015e22359",
        "name": "Harsh",
        "email": "harsh.vayuz@gmail.com",
        "password": bcrypt.hashSync('123456', 10),
        "reports": [],
        "createdAt": "2021-02-10T05:30:10.816Z",
        "updatedAt": "2021-02-10T05:35:56.284Z",
        "__v": 3
    }
]

export default user