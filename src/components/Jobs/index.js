import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const userProfileStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

/*

const employmentTypes = [
  {
    id: 'fullTime',
    labelText: 'FULL TIME',
  },
  {
    id: 'partTime',
    labelText: 'PART TIME',
  },
  {
    id: 'freelance',
    labelText: 'FREELANCE',
  },
  {
    id: 'internship',
    labelText: 'INTERNSHIP',
  },
]
*/

class Jobs extends Component {
  state = {
    userProfileDetails: {},
    userProfileError: userProfileStatus.failure,
    checkBoxFilter: [
      {
        fullTime: false,
      },
      {
        partTime: false,
      },
      {
        freelance: false,
      },
      {
        internship: false,
      },
    ],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsData()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)

    console.log(jwtToken)

    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({
        userProfileDetails: profileDetails,
        userProfileError: userProfileStatus.success,
      })
    } else {
      this.setState({userProfileError: userProfileStatus.failure})
    }
  }

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url =
      'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(url)
    //const data = await response.json()
    //console.log(data)
  }

  onEmploymentTypesFilter = id => {
    const {checkBoxFilter} = this.state
    const [fullTime, partTime] = checkBoxFilter
    console.log(fullTime)
    if (id === 'FULLTIME') {
      //const fullTime = id
      this.setState(prevState => ({
        checkBoxFilter: [
          {...prevState.checkBoxFilter},
          {fullTime: !prevState.checkBoxFilter.fullTime}
        ]
      }))
    } else if (id === 'PARTTIME') {
      // const partTime = id
      this.setState(prevState => ({partTime: !prevState.partTime}))
    } else if (id === 'FREELANCE') {
      // const freelance = id
      this.setState(prevState => ({freelance: !prevState.freelance}))
    } else if (id === 'INTERNSHIP') {
      // const internship = id
      this.setState(prevState => ({internship: !prevState.internship}))
    }
  }

  render() {
    const {userProfileError} = this.state

    return (
      <div>
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              onClick={() =>
                this.onEmploymentTypesFilter(each.employmentTypeId)
              }
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </div>
    )
  }
}

export default Jobs
