
interface Room {
    name: string;
    subName?: string;
    label: string;
    floor?: number;
}

  

interface DepartmentRooms {
    [department: string]: Room[];

}

interface Building {
    name: string;
    label: string;
}
  

export const Departments : DepartmentRooms = {

    'COS': [
        {
            name: 'Registrar',
            label: '38',
            floor: 1

        },
        {
            name: 'PE Department',
            label: '40',
            floor: 1

        },
        {
            name: 'Office of Admission',
            label: '41',
            floor: 1

        },
        {
            name: 'OSA',
            label: '43',
            floor: 1

        },
        {
            name: 'Guidance and Testing Office',
            label: '45',
            floor: 1

        },
        {
            name: 'Clinic',
            label: '51',
            floor: 1

        },
        {
            name: 'Museum',
            label: '50',
            floor: 1

        },
        {
            name: 'COS 210',
            subName: 'Office of the Dean COS', 
            label: '95',
            floor: 2

        },
        {
            name: 'COS 208',            
            label: '96',
            floor: 2

        },
        {
            name: 'COS 204',
            label: '97',
            floor: 2

        },
        {
            name: 'COS 209',
            label: '98',
            floor: 2

        },
        {
            name: 'COS 207',
            label: '99',
            floor: 2

        },
        {
            name: 'COS 205',
            label: '100',
            floor: 2

        },
        {
            name: 'COS 203',
            label: '101',
            floor: 2

        },
        {
            name: 'DOST Lab',
            subName: 'COS Research and Extension Office',
            label: '122',
            floor: 3

        },
        {
            name: 'COS 328',
            label: '123',
            floor: 3

        },
        {
            name: 'COS 326',
            label: '124',
            floor: 3

        },
        {
            name: 'COS 324',
            label: '125',
            floor: 3

        },
        {
            name: 'COS 322',
            label: '126',
            floor: 3

        },
        {
            name: 'COS 320',
            subName: 'Comp Studies Dept',
            label: '127',
            floor: 3

        },
        {
            name: 'DOST LRTC Office',
            label: '128',
            floor: 3

        },
        {
            name: 'Computer Lab B',
            label: '129',
            floor: 3

        },
        {
            name: 'Computer Lab A',
            label: '130',
            floor: 3

        },
        {
            name: 'Accreditation Room',
            label: '131',
            floor: 3

        },
        {
            name: 'Comfort Room',
            label: '120',
            floor: 3

        },
        {
            name: 'COS 318',
            subName: 'Math Department',
            label: '133',
            floor: 3

        },
        {
            name: 'COS 316',
            label: '134',
            floor: 3

        },
        {
            name: 'COS 314',
            label: '135',
            floor: 3

        },
        {
            name: 'COS 312',
            label: '136',
            floor: 3

        },
        {
            name: 'COS 317',
            label: '137',
            floor: 3

        },        
        {
            name: 'Comfort Room',
            label: '121',
            floor: 3

        },
        {
            name: 'COS 310',
            subName: 'Chemistry Department',
            label: '140',
            floor: 3

        },
        {
            name: 'COS 308',            
            label: '141',
            floor: 3

        },
        {
            name: 'COS 306',
            label: '142',
            floor: 3

        },
        {
            name: 'COS 304',
            label: '143',
            floor: 3

        },
        {
            name: 'COS 311',
            label: '144',
            floor: 3

        },
        {
            name: 'COS 309',
            label: '145',
            floor: 3

        },
        {
            name: 'COS 307',
            label: '146',
            floor: 3

        },
        {
            name: 'COS 305',
            label: '147',
            floor: 3

        },        

    ],
    'CLA': [
        {
            name: 'CLA 228',
            label: '76',
            floor: 2

        },
        {
            name: 'CLA 226',
            label: '77',
            floor: 2

        },
        {
            name: 'CLA 224',
            label: '78',
            floor: 2

        },
        {
            name: 'CLA 222',
            label: '79',
            floor: 2

        },
        {
            name: 'College EC/Accre Center',
            label: '80',
            floor: 2

        },        
        {
            name: 'CLA 227',
            label: '81',
            floor: 2

        },
        {
            name: 'CLA 225',
            label: '82',
            floor: 2

        },
        {
            name: 'CLA 223',
            label: '83',
            floor: 2

        },
        {
            name: 'CLA 221',
            label: '84',
            floor: 2

        },
        {
            name: '21',
            subName: 'Deptartment Social Science',
            label: '85',
            floor: 2

        },
        {
            name: 'Comfort Room',
            label: '74',
            floor: 2

        },
        {
            name: 'CLA 218',
            subName: 'Office of CLA Dean',
            label: '86',
            floor: 2

        },
        {
            name: 'CLA 216',
            label: '87',
            floor: 2

        },
        {
            name: 'CLA 214',
            label: '88',
            floor: 2

        },
        {
            name: 'CLA 212',
            label: '89',
            floor: 2

        },
        {
            name: 'CLA 217',
            label: '90',
            floor: 2

        },
        {
            name: 'CLA 215',
            label: '91',
            floor: 2

        },
        {
            name: 'CLA 213',
            label: '92',
            floor: 2

        },
        {
            name: 'CLA 211B',
            label: '93',
            floor: 2

        },
        {
            name: 'CLA 211A',
            label: '94',
            floor: 2

        },
        {
            name: 'CLA',
            label: '138',
            floor: 2

        },
        {
            name: '315 CLA 3B',
            label: '138',
            floor: 3

        },
        {
            name: 'CLA A',
            label: '139',
            floor: 3

        },
    ],
    'CIE': [
        {
            name: 'Technology shop 101',
            label: '190',
            floor: 1

        },
        {
            name: 'CIE 101',
            label: '191',
            floor: 1

        },
        {
            name: 'CIE 102',
            label: '195',
            floor: 1

        },
        {
            name: 'CIE 103',
            label: '196',
            floor: 1

        },
        {
            name: 'CIE 104',
            label: '197',
            floor: 1

        },
        {
            name: 'CIE 108',
            label: '192',
            floor: 1

        },
        {
            name: 'CIE 107',
            label: '193',
            floor: 1

        },
        {
            name: 'CIE 106',
            label: '194',
            floor: 1

        },
        {
            name: 'Comfort Room',
            label: '185',
            floor: 1

        },
        {
            name: 'CIE 214',
            label: '247',
            floor: 2

        },
        {
            name: 'CIE 213',
            label: '248',
            floor: 2

        },
        {
            name: 'CIE 212',
            label: '250',
            floor: 2

        },
        {
            name: 'CIE 211',
            label: '251',
            floor: 2

        },
        {
            name: 'CIE 210',
            label: '252',
            floor: 2

        },
        {
            name: 'CIE 209',
            label: '253',
            floor: 2

        },
        {
            name: 'CIE 208',
            label: '258',
            floor: 2

        },
        {
            name: 'Comfort Room ',
            label: '245',
            floor: 2

        },
        {
            name: 'CIE 201',
            label: '249',
            floor: 2

        },
        {
            name: 'CIE 202',
            label: '254',
            floor: 2

        },
        {
            name: 'CIE 203',
            label: '255',
            floor: 2

        },
        {
            name: 'CIE 204',
            label: '256',
            floor: 2

        },
        {
            name: 'CIE 205',
            label: '257',
            floor: 2

        },
        {
            name: 'CIE 206',
            label: '259',
            floor: 2

        },
        {
            name: 'CIE 207',
            label: '260',
            floor: 2

        },
        {
            name: 'CIE 300',
            label: '307',
            floor: 3

        },
        {
            name: 'CIE 311',
            label: '308',
            floor: 3

        },
        {
            name: 'CIE 310',
            label: '309',
            floor: 3

        },
        {
            name: 'CIE 309',
            label: '310',
            floor: 3

        },
        {
            name: 'CIE 308B',
            label: '311',
            floor: 3

        },
        {
            name: 'CIE 308',
            label: '312',
            floor: 3

        },
        {
            name: 'CIE 307',
            label: '318',
            floor: 3

        },
        {
            name: 'CIE 301',
            label: '313',
            floor: 3

        },
        {
            name: 'CIE 302',
            label: '314',
            floor: 3

        },
        {
            name: 'CIE 303',
            label: '315',
            floor: 3

        },
        {
            name: 'CIE 304',
            label: '316',
            floor: 3

        },
        {
            name: 'CIE 305',
            label: '317',
            floor: 3

        },
        {
            name: 'CIE 306',
            label: '319',
            floor: 3

        },
    ],
    'CAFA': [
        {
            name: 'CAFA 101',
            label: '209',
            floor: 1

        },
        {
            name: 'CAFA 102',
            label: '208',
            floor: 1

        },
        {
            name: 'CAFA 103',
            label: '207',
            floor: 1

        },
        {
            name: 'CAFA 113',
            label: '206',
            floor: 1

        },
        {
            name: 'CAFA 112',
            label: '205',
            floor: 1

        },
        {
            name: 'CAFA 111',
            label: '204',
            floor: 1

        },
        {
            name: 'CAFA 110',
            label: '203',
            floor: 1

        },
        {
            name: 'CAFA 108',
            label: '202',
            floor: 1

        },
        {
            name: 'CAFA 107',
            label: '201',
            floor: 1

        },
        {
            name: 'CAFA 106',
            label: '200',
            floor: 1

        },
        {
            name: 'CAFA 105',
            label: '198',
            floor: 1

        },
        {
            name: 'CAFA 104',
            label: '199',
            floor: 1

        },
        {
            name: 'Comfort Room',
            label: '186',
            floor: 1

        },
        {
            name: 'CAFA 201',
            label: '272',
            floor: 2

        },
        {
            name: 'CAFA 202',
            label: '273',
            floor: 2

        },
        {
            name: 'CAFA 203',
            label: '274',
            floor: 2

        },
        {
            name: 'CAFA 213',
            label: '271',
            floor: 2

        },
        {
            name: 'CAFA 212',
            label: '270',
            floor: 2

        },
        {
            name: 'CAFA 211',
            label: '269',
            floor: 2

        },
        {
            name: 'CAFA 210',
            label: '268',
            floor: 2

        },
        {
            name: 'CAFA 209',
            label: '267',
            floor: 2

        },
        {
            name: 'CAFA 208',
            label: '266',
            floor: 2

        },
        {
            name: 'CAFA 207',
            label: '265',
            floor: 2

        },
        {
            name: 'CAFA 206',
            subName: 'Office of CAFA Dean',
            label: '264',
            floor: 2

        },
        {
            name: 'CAFA 205',
            label: '261',
            floor: 2

        },
        {
            name: 'CAFA 204',
            label: '263',
            floor: 2

        },
        {
            name: 'Comfort Room',
            label: '246',
            floor: 2

        },
        {
            name: 'CAFA 301',
            label: '331',
            floor: 3

        },
        {
            name: 'CAFA 302',
            label: '332',
            floor: 3

        },
        {
            name: 'CAFA 303',
            label: '333',
            floor: 3

        },
        {
            name: 'CAFA 313',
            label: '330',
            floor: 3

        },
        {
            name: 'CAFA 312',
            label: '329',
            floor: 3

        },
        {
            name: 'CAFA 311',
            label: '328',
            floor: 3

        },
        {
            name: 'CAFA 310',
            label: '327',
            floor: 3

        },
        {
            name: 'CAFA 309',
            label: '326',
            floor: 3

        },
        {
            name: 'CAFA 308',
            label: '325',
            floor: 3

        },
        {
            name: 'CAFA 307',
            label: '324',
            floor: 3

        },
        {
            name: 'CAFA 306',
            subName: 'Accre Room',
            label: '323',
            floor: 3

        },
        {
            name: 'CAFA 305',
            label: '321',
            floor: 3

        },
        {
            name: 'CAFA 304',
            label: '322',
            floor: 3

        },
        {
            name: 'Comfort Room',
            label: '306',
            floor: 3

        },
        {
            name: 'CAFA 401',
            label: '364',
            floor: 4

        },
        {
            name: 'CAFA 402',
            label: '365',
            floor: 4

        },
        {
            name: 'CAFA 403',
            label: '366',
            floor: 4

        },
        {
            name: 'CAFA 413',
            label: '360',
            floor: 4

        },
        {
            name: 'CAFA 412',
            label: '359',
            floor: 4

        },
        {
            name: 'CAFA 411',
            label: '358',
            floor: 4

        },
        {
            name: 'CAFA 410',
            label: '357',
            floor: 4

        },
        {
            name: 'CAFA 409',
            label: '356',
            floor: 4

        },
        {
            name: 'CAFA 408',
            label: '355',
            floor: 4

        },
        {
            name: 'CAFA 407',
            label: '354',
            floor: 4

        },
        {
            name: 'CAFA 406A',            
            label: '357',
            floor: 4

        },
        {
            name: 'CAFA 406B',            
            label: '356',
            floor: 4

        },
        {
            name: 'CAFA 405',
            label: '367',
            floor: 4

        },
        {
            name: 'CAFA 404',
            label: '358',
            floor: 4

        },
        {
            name: 'Comfort Room',
            label: '353',
            floor: 4

        },
        
    ],
    'CIT': [
        {
            name: 'CAFA 101',
            label: '209',
            floor: 1
        },
    ],    
}


export const Buildings: Building[] = [

    {
        name: "CIT OLD BUILDING",
        label: "392"
    },
    {
        name: "MOTORPOOL",
        label: "393"
        
    },
    {
        name: "PPET",
        label: "395"
        
    },
    {
        name: "IRTC",
        label: "400"
        
    },
    {
        name: "COE",
        label: "398"
        
    },
    {
        name: "CASHIER",
        label: "401"
        
    },
    {
        name: "COURT",
        label: "389"
        
    },
    {
        name: "STAGE",
        label: "390"
        
    },
    {
        name: "LIBLARY",
        label: "373"
        
    },
    {
        name: "CHAPEL",
        label: "381"
        
    },
    {
        name: "CANTEEN",
        label: "187"
        
    }

];