export const Wizard = {
    setWorkflowDirty: 'set_dirty/wizard',
    resetWorkFlow: 'reset_workflow/wizard'
};

export const setWorkflowDirty = () => {
    return {
        type: Wizard.setWorkflowDirty
    }
}

export const resetWorkFlow = () => {
    return {
        type: Wizard.resetWorkFlow
    }
};