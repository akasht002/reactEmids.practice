import React from 'react';
import Enzyme from 'enzyme';
import { updateCountList,checkDataCount   } from './utilActions'


describe('utilActions', ()=>{

    it('updateCountList',()=>{
        expect(updateCountList([{}],{
            data:[{
            label:"",
            statusName:'',
            subtext:'',
            totalCount:345
        }]})).toBeDefined();
    })

    it('checkDataCount',()=>{
        expect(checkDataCount([{
            label:"",
            statusName:'',
            subtext:'',
            totalCount:345
        }])).toBeDefined();
    })

});
