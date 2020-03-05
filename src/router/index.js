import Vue from 'vue'
import Router from 'vue-router'
import monitor from '../components/Monitor'
import generalView from '../components/general/GeneralView'

import ecsMain from '../components/statistic/ecs/EcsMain'
import ossMain from '../components/statistic/oss/OssMain'
import rdsMain from '../components/statistic/rds/RdsMain'

import ecsMonitor from '../components/statistic/EcsMonitor'
import ossMonitor from '../components/statistic/OssMonitor'
import rdsMonitor from '../components/statistic/RdsMonitor'
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
          path: 'generalView',
          name: 'generalView',
          component: generalView
        },
        {
          path: 'ecsMain',
          name: 'ecsMain',
          component: ecsMain
        },
        {
          path: 'ecsMonitor',
          name: 'ecsMonitor',
          component: ecsMonitor
        },
        {
          path: 'ossMain',
          name: 'ossMain',
          component: ossMain
        },
        {
          path: 'ossMonitor',
          name: 'ossMonitor',
          component: ossMonitor
        },
        {
          path: 'rdsMain',
          name: 'rdsMain',
          component: rdsMain
        },
        {
          path: 'rdsMonitor',
          name: 'rdsMonitor',
          component: rdsMonitor
        }
      ]
    }
  ]
})
