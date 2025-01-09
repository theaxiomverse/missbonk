// pages/admin/applications.vue
<template>
  <div class="min-h-screen bg-gray-900">
    <AdminHeader title="Applications Management" />
    
    <div class="container mx-auto px-4 py-8">
      <!-- Filters -->
      <div class="bg-gray-800 rounded-xl p-6 mb-8">
        <div class="grid md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Status</label>
            <select v-model="filters.status" 
                    class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm text-gray-400 mb-2">Country</label>
            <select v-model="filters.country" 
                    class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white">
              <option value="">All Countries</option>
              <option v-for="country in countries" 
                      :key="country" 
                      :value="country">
                {{ country }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Date Range</label>
            <input type="date" 
                   v-model="filters.dateRange"
                   class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white" />
          </div>

          <div class="flex items-end">
            <button @click="resetFilters" 
                    class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Applications Table -->
      <div class="bg-gray-800 rounded-xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-white">Applications</h2>
          <div class="flex gap-4">
            <button class="text-gray-400 hover:text-white">
              <Icon name="ph:download" class="w-5 h-5" />
            </button>
            <button class="text-gray-400 hover:text-white">
              <Icon name="ph:filter" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left border-b border-gray-700">
                <th v-for="header in tableHeaders" 
                    :key="header"
                    class="pb-4 text-gray-400">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="application in filteredApplications" 
                  :key="application.id"
                  class="border-b border-gray-700 text-white">
                <td class="py-4">
                  <div class="flex items-center gap-3">
                    <img :src="application.photo" 
                         :alt="application.name"
                         class="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p class="font-medium">{{ application.name }}</p>
                      <p class="text-sm text-gray-400">ID: {{ application.id }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-4">{{ application.country }}</td>
                <td class="py-4">{{ application.date }}</td>
                <td class="py-4">
                  <StatusBadge :status="application.status" />
                </td>
                <td class="py-4">
                  <div class="flex items-center gap-2">
                    <button @click="viewApplication(application)"
                            class="text-gray-400 hover:text-white">
                      <Icon name="ph:eye" class="w-5 h-5" />
                    </button>
                    <button @click="approveApplication(application)"
                            class="text-green-500 hover:text-green-400">
                      <Icon name="ph:check-circle" class="w-5 h-5" />
                    </button>
                    <button @click="rejectApplication(application)"
                            class="text-red-500 hover:text-red-400">
                      <Icon name="ph:x-circle" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
          <p class="text-gray-400">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalApplications }} entries
          </p>
          <div class="flex gap-2">
            <button 
              @click="previousPage"
              :disabled="currentPage === 1"
              class="bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Modal -->
    <Modal v-if="selectedApplication"
           @close="selectedApplication = null">
      <template #header>
        <h3 class="text-xl font-bold text-white">
          Application Details
        </h3>
      </template>

      <template #body>
        <div class="space-y-6">
          <!-- Basic Info -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-400 mb-1">Name</label>
              <p class="text-white">{{ selectedApplication.name }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Country</label>
              <p class="text-white">{{ selectedApplication.country }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Age</label>
              <p class="text-white">{{ selectedApplication.age }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Application Date</label>
              <p class="text-white">{{ selectedApplication.date }}</p>
            </div>
          </div>

          <!-- Photos -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Photos</label>
            <div class="grid grid-cols-3 gap-4">
              <img v-for="(photo, index) in selectedApplication.photos" 
                   :key="index"
                   :src="photo"
                   :alt="'Photo ' + (index + 1)"
                   class="w-full aspect-square object-cover rounded-lg" />
            </div>
          </div>

          <!-- Social Media -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Social Media</label>
            <div class="space-y-2">
              <div v-for="social in selectedApplication.socialMedia" 
                   :key="social.platform"
                   class="flex items-center gap-2">
                <Icon :name="social.icon" class="w-5 h-5 text-gray-400" />
                <a :href="social.url" 
                   target="_blank"
                   class="text-pink-500 hover:underline">
                  {{ social.username }}
                </a>
                <StatusBadge 
                  v-if="social.verified"
                  status="verified"
                  size="sm"
                />
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Admin Notes</label>
            <textarea
              v-model="adminNotes"
              rows="3"
              class="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
              placeholder="Add notes about this application..."
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-4">
          <button 
            @click="rejectApplication(selectedApplication)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Reject
          </button>
          <button 
            @click="approveApplication(selectedApplication)"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Approve
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
const filters = reactive({
  status: '',
  country: '',
  dateRange: ''
})

const currentPage = ref(1)
const itemsPerPage = 10
const adminNotes = ref('')
const selectedApplication = ref(null)

// Mock data
const applications = [
  {
    id: 1,
    name: 'Sarah Johnson',
    photo: 'https://i.pravatar.cc/150?img=1',
    country: 'USA',
    age: 24,
    date: '2025-04-01',
    status: 'pending',
    photos: [
      'https://i.pravatar.cc/300?img=1',
      'https://i.pravatar.cc/300?img=2',
      'https://i.pravatar.cc/300?img=3'
    ],
    socialMedia: [
      {
        platform: 'Instagram',
        icon: 'uil:instagram',
        username: '@sarah.j',
        url: '#',
        verified: true
      },
      {
        platform: 'Twitter',
        icon: 'uil:twitter',
        username: '@sarahj',
        url: '#',
        verified: true
      }
    ]
  }
  // Add more mock applications
]

const tableHeaders = [
  'Applicant',
  'Country',
  'Date',
  'Status',
  'Actions'
]

const filteredApplications = computed(() => {
  let filtered = [...applications]

  if (filters.status) {
    filtered = filtered.filter(app => app.status === filters.status)
  }

  if (filters.country) {
    filtered = filtered.filter(app => app.country === filters.country)
  }

  if (filters.dateRange) {
    filtered = filtered.filter(app => app.date >= filters.dateRange)
  }

  return filtered.slice(startIndex.value, endIndex.value)
})

const totalApplications = computed(() => applications.length)
const totalPages = computed(() => Math.ceil(totalApplications.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalApplications.value))

const viewApplication = (application) => {
  selectedApplication.value = application
}

const approveApplication = async (application) => {
  try {
    // Implement approval logic
    console.log('Approving application:', application.id)
    selectedApplication.value = null
  } catch (error) {
    console.error('Error approving application:', error)
  }
}

const rejectApplication = async (application) => {
  try {
    // Implement rejection logic
    console.log('Rejecting application:', application.id)
    selectedApplication.value = null
  } catch (error) {
    console.error('Error rejecting application:', error)
  }
}

const resetFilters = () => {
  Object.keys(filters).forEach(key => filters[key] = '')
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>