import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/Login'
import register from '../components/Register'
import monitor from '../components/Monitor'
import generalView from '../components/general/GeneralView'

import ecsMain from '../components/statistic/ecs/EcsMain'
import ossMain from '../components/statistic/oss/OssMain'
import rdsMain from '../components/statistic/rds/RdsMain'

import ecsMonitor from '../components/statistic/ecs/EcsMonitor'
import ossMonitor from '../components/statistic/oss/OssMonitor'
import rdsMonitor from '../components/statistic/rds/RdsMonitor'

import ruleMain from '../components/alarm/rule/RuleMain'
import addRule from '../components/alarm/rule/AddRule'

import contactMain from '../components/alarm/contact/ContactMain'
import addContact from '../components/alarm/contact/AddContact'

import groupMain from '../components/alarm/group/GroupMain'
import addGroup from '../components/alarm/group/AddGroup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/monitor',
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
          path: '/ecsMain',
          name: 'ecsMain',
          component: ecsMain
        },
        {
          path: '/ecsMonitor',
          name: 'ecsMonitor',
          component: ecsMonitor
        },
        {
          path: '/ossMain',
          name: 'ossMain',
          component: ossMain
        },
        {
          path: '/ossMonitor',
          name: 'ossMonitor',
          component: ossMonitor
        },
        {
          path: '/rdsMain',
          name: 'rdsMain',
          component: rdsMain
        },
        {
          path: '/rdsMonitor',
          name: 'rdsMonitor',
          component: rdsMonitor
        },
        {
          path: '/ruleMain',
          name: 'ruleMain',
          component: ruleMain
        },
        {
          path: '/addRule',
          name: 'addRule',
          component: addRule
        },
        {
          path: '/contactMain',
          name: 'contactMain',
          component: contactMain
        },
        {
          path: '/addContact',
          name: 'addContact',
          component: addContact
        },
        {
          path: '/groupMain',
          name: 'groupMain',
          component: groupMain
        },
        {
          path: '/addGroup',
          name: 'addGroup',
          component: addGroup
        }
      ]
    }
  ]
})
