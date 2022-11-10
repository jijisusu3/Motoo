package com.motoo.api.response;

import com.motoo.db.entity.Events;
import com.motoo.db.entity.School;
import com.motoo.db.entity.Sigungu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.w3c.dom.events.Event;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolPageResponse {

    private SchoolSubResponse schoolSubResponse;

    private EventsResponse eventsResponse;

//    private SchoolAccResponse schoolAccResponse;

    public static SchoolPageResponse response(School school, Events events){

        return new SchoolPageResponse(new SchoolSubResponse(school.getSchoolId(),school.getSchoolname(), school.getRank(), school.getAverage(), school.getToday(), SigunguSubResponse.response(school.getSigungu())), new EventsResponse(events.getEventsId(), events.getOpen_date(), events.getClose_date(), events.getHall_of_fame()));

    }




}
