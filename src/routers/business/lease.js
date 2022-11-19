import LeaseAdd from '@/components/business/lease/add'
import LeaseIndex from '@/components/business/lease/index'
import LeaseInfo from '@/components/business/lease/info'
import LeaseExpress from '@/components/business/lease/express'
import LeaseRecovery from '@/components/business/lease/recovery'
import LeaseComment from '@/components/business/lease/comment'

const lease = [
  {
    path: 'lease/add',
    name: 'LeaseAdd',
    component: LeaseAdd,
    auth: true
  },
  {
      path: 'lease/index',
      name: 'LeaseIndex',
      component: LeaseIndex,
      auth: true
  },
  {
      path: 'lease/info',
      name: 'LeaseInfo',
      component: LeaseInfo,
      auth: true
  },
  {
      path: 'lease/express',
      name: 'LeaseExpress',
      component: LeaseExpress,
      auth: true
  },
  {
      path: 'lease/recovery',
      name: 'LeaseRecovery',
      component: LeaseRecovery,
      auth: true
  },
  {
      path: 'lease/comment',
      name: 'LeaseComment',
      component: LeaseComment,
      auth: true
  },
]

export default lease