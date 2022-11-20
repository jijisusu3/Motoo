package com.motoo.api.response;

import com.motoo.db.entity.Events;
import com.motoo.db.entity.School;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolPageResponse {

    private SchoolSubResponse schoolSubResponse;

    private EventsResponse eventsResponse;

    private SchoolAccResponse schoolAccResponse;

    public static SchoolPageResponse response(School school, Events events, Integer cash, Integer asset, Float avg, Long schoolAccId){

        return new SchoolPageResponse(

                new SchoolSubResponse(school.getSchoolId(),school.getSchoolname(), school.getCurrentRank(), school.getAverage(), school.getStudRanks(), SigunguSubResponse.response(school.getSigungu())),
                new EventsResponse(events.getEventsId(), events.getOpen_date(), events.getClose_date(), events.getHall_of_fame()),
                new SchoolAccResponse(cash, asset, avg, schoolAccId)


        );

    }




}
