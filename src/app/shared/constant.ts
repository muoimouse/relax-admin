import { environment } from '../../environments/environment';

export const constant: any = {
    BASE_API: `${location.protocol}//${environment.base_api}/api/`,
    FILE_URL: `${location.protocol}//${environment.base_api}/files/`,
    BASE_WEB: `${location.protocol}//${environment.base_web}/`,

    // User group
    GROUP_ADMIN : 1,
    GROUP_USER : 2,

    User : {
        group : {
            1: 'Group admin',
            2: 'Group member',
        },
        gender : {
            1: 'Male',
            2: 'Female',
        },
    },

    fileValidateDefault: {
        required: true,
        size: 3072, // 3M
        extensions: ['jpg', 'png', 'jpeg', 'pdf']
    },

    Active: {
        1: 'Yes',
        0: 'No'
    }
}
