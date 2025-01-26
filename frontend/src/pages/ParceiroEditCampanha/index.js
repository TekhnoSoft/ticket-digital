import React, { useState } from 'react'
import FragmentView from '../../components/FragmentView'
import SpaceBox from '../../components/SpaceBox';

export default () => {
    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <SpaceBox space={8}/>
            <h2>Editar campanha</h2>
            <SpaceBox space={15}/>
        </FragmentView>
    )
}
