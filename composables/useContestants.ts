export const useContestants = () => {
    const contestants = ref([
      {
        id: 1,
        name: 'Jessica Chen',
        image: '/candidate1.png',
        galleryImages: [
          '/candidate1-2.png',
          '/candidate1-3.png',
          '/candidate1-4.png'
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
        image: '/candidate2.png',
        galleryImages: [
          '/candidate2-2.png',
          '/candidate2-3.png',
          '/candidate2-4.png'
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
        image: '/candidate3.png',
        galleryImages: [
          '/candidate3-2.png',
          '/candidate3-3.png',
          '/candidate3-4.png'
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
  