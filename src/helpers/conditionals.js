const conditionals={}

conditionals.isSwitch=(value,options)=>{
    this.switch_value = value;
    return options.fn(this);
}

conditionals.isCase=(value,options)=>{
    if (value == this.switch_value) {
        return options.fn(this);
    }
}

module.exports=conditionals