import Vue from 'vue'
import Router from 'vue-router'
import monitor from '../components/monitor'
import generalView from '../components/general/generalView'

import ossMain from '../components/statistic/oss/ossMain'

import ecsMonitor from '../components/statistic/ecsMonitor'
import ossMonitor from '../components/statistic/ossMonitor'
import rdsMonitor from '../components/statistic/rdsMonitor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'monitor',
      component: monitor,
      children: [
        //  概览
        {
          path: '/generalView',
          name: 'generalView',
          component: generalView
        },
        {
          path: '/ecsMonitor',
          name: 'ecsMonitor',
          component: ecsMonitor
        },
        {
          path: '/ossMain',
          name: 'ossMain',
          component: ossMain,
          children: [
            {
              path: '/ossMonitor',
              name: 'ossMonitor',
              component: ossMonitor
            }
          ]
        },
        {
          path: '/rdsMonitor',
          name: 'rdsMonitor',
          component: rdsMonitor
        }
      ]
    }
  ]
})
