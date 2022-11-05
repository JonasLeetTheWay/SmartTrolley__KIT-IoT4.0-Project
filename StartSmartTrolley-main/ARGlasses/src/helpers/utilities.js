let nextId = 0;
export function generateId() {
  const result = nextId;
  nextId += 1;
  return result;
}
export const getTimeStamp= () => {
  var date= new Date(Date.now())
  var year=date.getFullYear().toString()
  var month=(date.getMonth()+1).toString()
  var day=date.getDate().toString()
  var hour=date.getHours()
  var minutes=date.getMinutes().toString()
  var seconds=date.getSeconds().toString()

  month=month.length===1?`0${month}`:month
  day=day.length===1?`0${day}`:day
  hour=hour.length===1?`0${hour}`:hour
  minutes=minutes.length===1?`0${minutes}`:minutes
  seconds=seconds.length===1?`0${seconds}`:minutes
return year+month+day+hour+minutes+seconds;
}