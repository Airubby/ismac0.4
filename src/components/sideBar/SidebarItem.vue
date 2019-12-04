<template>
    <div class="menu-wrapper" :data-path="item.path">
        <template v-if="!hasChild(item.children,item)">
            <app-link v-if="item.meta.type=='nav'" :to="resolvePath(item.path)">
                <el-menu-item :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown':!isNest}">
                    <i :class="item.meta.icon" class="svg-icon"></i>
                    <span slot="title">{{$t("navbar."+item.name)}}</span>
                </el-menu-item>
            </app-link>
        </template>
        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)">
            <template slot="title">
                <div @click="select(item.name,item.path)">
                    <i :class="item.meta.icon" class="svg-icon"></i>
                    <span>{{$t("navbar."+item.name)}}</span>
                </div>
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>
<script>
import path from 'path'
import { isExternal } from './utils/validate'
import AppLink from './Link'
export default {
    name: 'SidebarItem',
    components: { AppLink },
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data(){
        return{
            baseURI:''
        }
    },
    methods:{
        hasChild(children = [], item){
            if(children.length>0){
                return true;
            }
            return false;
        },
        resolvePath(routePath) {
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(this.basePath)) {
                return this.basePath
            }
            return path.resolve(this.basePath, routePath)
        },
        select(key,path){
            this.$emit("backInfo",path)
        }
    }
}
</script>