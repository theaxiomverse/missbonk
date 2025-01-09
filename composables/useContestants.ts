export const useContestants = () => {
    const contestants = ref([
      {
        id: 1,
        name: 'Jessica Chen',
        image: 'https://i.pravatar.cc/400?img=47',
        galleryImages: [
          'https://i.pravatar.cc/400?img=25',
          'https://i.pravatar.cc/400?img=27',
          'https://i.pravatar.cc/400?img=29'
        ],
        country: 'Singapore',
        age: 24,
        socialMedia: {
          instagram: '@jessicachen',
          twitter: '@jess_chen'
        },
        votes: 2845,
        description: 'Digital artist and crypto enthusiast, passionate about Web3 and NFTs.'
      },
      {
        id: 2,
        name: 'Maria Garcia',
        image: 'https://i.pravatar.cc/400?img=31',
        galleryImages: [
          'https://i.pravatar.cc/400?img=32',
          'https://i.pravatar.cc/400?img=33',
          'https://i.pravatar.cc/400?img=35'
        ],
        country: 'Spain',
        age: 26,
        socialMedia: {
          instagram: '@mariagarcia',
          twitter: '@maria_g'
        },
        votes: 3156,
        description: 'Fashion designer and blockchain advocate, creating digital fashion NFTs.'
      },
      {
        id: 3,
        name: 'Sarah Johnson',
        image: 'https://i.pravatar.cc/400?img=37',
        galleryImages: [
          'https://i.pravatar.cc/400?img=38',
          'https://i.pravatar.cc/400?img=41',
          'https://i.pravatar.cc/400?img=43'
        ],
        country: 'USA',
        age: 25,
        socialMedia: {
          instagram: '@sarahjohnson',
          twitter: '@sarah_j'
        },
        votes: 2967,
        description: 'Tech entrepreneur and DeFi expert, building the future of finance.'
      }
    ])
  
    return {
      contestants
    }
  }
  