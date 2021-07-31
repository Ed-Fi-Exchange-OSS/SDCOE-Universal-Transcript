export const districtSerialize = (districts) => {
  return  districts.map(district => {
    return {
      id: district.id,
      CDSCode: district.CDS_code,
      districtName: district.district_name
    }
  });
}
