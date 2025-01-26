import React, { useState } from 'react'
import FragmentView from '../../components/FragmentView'
import SpaceBox from '../../components/SpaceBox';
import Button from '../../components/Button';

export default () => {
    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <SpaceBox space={8}/>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h2>Afiliados</h2>
                <Button>+ afiliados</Button>
            </div>
            <SpaceBox space={15}/>
        </FragmentView>
    )
}
