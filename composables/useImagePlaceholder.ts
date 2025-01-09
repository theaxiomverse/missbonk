// composables/useImagePlaceholder.ts
export const useImagePlaceholder = () => {
    // You could expand this to support multiple placeholder services
    const getFemalePlaceholder = (size = 400, id: number) => {
      return `https://i.pravatar.cc/${size}?img=${id}`
    }
  
    const getFemaleGallery = (count = 3, startId = 1) => {
      return Array.from({ length: count }, (_, i) => 
        getFemalePlaceholder(400, startId + i)
      )
    }
  
    return {
      getFemalePlaceholder,
      getFemaleGallery
    }
  }
