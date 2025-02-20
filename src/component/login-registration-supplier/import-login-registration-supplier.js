import { useCallback, useEffect, useRef, useState , useContext } from "react";
import React from "react";
import { useSelector , useDispatch} from "react-redux";

// ******
import Button from "@/component/component-general/button.jsx";
import Text from "@/component/component-general/input/text.jsx";
import TextNumber from "@/component/component-general/input/textNumber.jsx";
import WithSupport from "@/component/component-general/withSupport.jsx";
import WithSupport3 from "@/component/component-general/withSupport3.jsx";
import SvgDesktop1 from "@/component/component-general/svg/svg1.jsx";
import SvgDesktop2 from "@/component/component-general/svg/svg2.jsx";
import SvgDesktop3 from "@/component/component-general/svg/svg3.jsx";
import Password2 from "@/component/component-general/input/password2.jsx";
import Password from "@/component/component-general/input/password.jsx";
import TextFull from "@/component/component-general/input/textFull.jsx";
import City from "@/component/component-general/city/city.jsx";
import TextArea from "@/component/component-general/input/textArea.jsx";
import SelectAllInput from "@/component/component-general/selectAll.jsx";
import CheckBox from "@/component/component-general/input/checkBox.jsx";
import SvgDesktop4 from "@/component/component-general/svg/svg4.jsx";
import Load from "@/component/component-general/load.jsx";
import InputCode from "@/component/component-general/input/inputCode.jsx";
import CheckMessage from "@/component/component-general/checkMessage.jsx";
// *****
import { fetchProvinces, cityData , fetchGetAllBrand , postDataAll} from "@/data.js";
import { categoryGetAll } from "@/services/basicDefinitions/ClassificationOfGoods.js";
import { UserRegisterOrLogin, UserToken, UserLoginToken } from "@/services/login/login.js";

// *****

import { setToken, setAuth } from "@/Store/store.js";
// ********

export {
    React,
    useCallback,
    useEffect,
    useRef,
    useState,
    useContext,
    useSelector,
    useDispatch,

    Button,
    Text,
    CheckMessage,
    InputCode,
    Load,
    TextNumber,
    WithSupport,
    WithSupport3,
    SvgDesktop1,
    SvgDesktop2,
    SvgDesktop3,
    SvgDesktop4,
    Password,
    Password2,
    TextFull,
    City,
    CheckBox,
    TextArea,
    SelectAllInput,

    fetchProvinces,
    fetchGetAllBrand,
    cityData,
    categoryGetAll,
    postDataAll,
    UserRegisterOrLogin,
    UserToken,
    UserLoginToken,

    setToken,
    setAuth
}