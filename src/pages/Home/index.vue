<script setup lang="ts">
import IndexedDB from '../../utils/indexedDB';

const airbnbDB = new IndexedDB('airbnb');
airbnbDB.open('elephant', 'id', ['nose', 'ear']);

const addDB = () => {
  airbnbDB.addItem('elephant', {
    nose: '20m',
    ear: 'small'
  });
};

const updateDB = () => {
  airbnbDB.updateItem('elephant', {
    nose: '10m',
    ear: 'medium',
    id: 1
  });
};

const deleteDB = () => {
  airbnbDB.removeItem('elephant', 1);
};

const getAllData = () => {
  airbnbDB.getList('elephant');
};

const getData = () => {
  airbnbDB.getItem('elephant', 4);
};
</script>

<template>
  <div>
    <el-button type="primary" @click="addDB">Add</el-button>
    <el-button type="primary" @click="updateDB">Update</el-button>
    <el-button type="primary" @click="deleteDB">Delete</el-button>
    <el-button type="primary" @click="getAllData">Get All</el-button>
    <el-button type="primary" @click="getData">Get Data</el-button>
    <br /><br />
    <el-date-picker type="datetime" placeholder="Select date and time" />
  </div>
</template>

<style lang="scss" scoped></style>
