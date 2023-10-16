export function doFunStuff() {
    console.log("YEY FUN STUFF");
}

export function sortByDone(a, b) {
    if (b.isdone) {
      return -1;
    }
    if (a.isdone) {
      return 1;
    }
    return 0;
  }